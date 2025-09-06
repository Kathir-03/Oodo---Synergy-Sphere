from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from .models import Project,Task,ProjectMember

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "password2")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.username = validated_data["email"]
        user.set_password(password)
        user.save()
        return user

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.IntegerField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    new_password2 = serializers.CharField(min_length=8)

    def validate(self, data):
        if data["new_password"] != data["new_password2"]:
            raise serializers.ValidationError({"new_password": "Passwords must match."})
        return data
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")

#project creation
class TaskCreateSerializer(serializers.ModelSerializer):
    assigned_to_email = serializers.EmailField(source="assigned_to.email", read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "assigned_to", "assigned_to_email", "deadline", "status","project"]

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_email = serializers.EmailField(source="assigned_to.email", read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "assigned_to", "assigned_to_email", "deadline", "status","project"]

class ProjectMemberSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = ProjectMember
        fields = ["id", "user", "user_email", "role"]

class ProjectSerializer(serializers.ModelSerializer):
    members = ProjectMemberSerializer(source="projectmember_set", many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ["id", "title", "status", "created_at", "deadline", "members", "tasks"]

class ProjectCreateSerializer(serializers.ModelSerializer):
    members = serializers.ListField(child=serializers.DictField(), write_only=True)

    class Meta:
        model = Project
        fields = ["title", "deadline", "members"]

    def create(self, validated_data):
        members_data = validated_data.pop("members")
        project = Project.objects.create(**validated_data)

        for m in members_data:
            email = m.get("email")
            role = m["role"]  # now strictly uses the role sent by frontend

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError(f"User with email {email} does not exist.")

            ProjectMember.objects.create(
                project=project,
                user=user,
                role=role
            )

        return project


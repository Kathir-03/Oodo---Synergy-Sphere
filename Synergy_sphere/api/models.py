from django.db import models

# collaboration/models.py
from django.db import models
from django.contrib.auth.models import User

# Choices for project and task status
PROJECT_STATUS_CHOICES = [
    ("Pending", "Pending"),
    ("In Progress", "In Progress"),
    ("Completed", "Completed"),
]

TASK_STATUS_CHOICES = [
    ("To Do", "To Do"),
    ("In Progress", "In Progress"),
    ("Done", "Done"),
]

# Project model
class Project(models.Model):
    title = models.CharField(max_length=255)
    members = models.ManyToManyField(
        User, through="ProjectMember", related_name="projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=PROJECT_STATUS_CHOICES, default="pending")

    def __str__(self):
        return self.title

# ProjectMember for role in a project
class ProjectMember(models.Model):
    ROLE_CHOICES = [
        ("Project Manager", "Project_Manager"),
        ("Lead","Lead"),
        ("Developer", "Developer"),
        ("Tester", "Tester"),
        ("QA engineer","QA engineer"),
        ("Analyst","Analyst")
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    class Meta:
        unique_together = ("user", "project")  # same user cannot have multiple roles in same project

    def __str__(self):
        return f"{self.user.email} in {self.project.title} as {self.role}"

# Task model
class Task(models.Model):
    title = models.CharField(max_length=255)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default="todo")

    def __str__(self):
        return f"{self.title} ({self.status})"


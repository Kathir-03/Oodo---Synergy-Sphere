from django.urls import path
from .views import (
    CsrfTokenView, RegisterAPIView, LoginAPIView, LogoutAPIView, CurrentUserAPIView,
    PasswordResetConfirmAPIView,PasswordResetRequestAPIView
)

urlpatterns = [
    path("auth/csrf/", CsrfTokenView.as_view(), name="auth-csrf"),
    path("auth/register/", RegisterAPIView.as_view(), name="auth-register"),
    path("auth/login/", LoginAPIView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutAPIView.as_view(), name="auth-logout"),
    path("auth/user/", CurrentUserAPIView.as_view(), name="auth-user"),
    path("auth/password-reset/", PasswordResetRequestAPIView.as_view(), name="password-reset"),
    path("auth/password-reset-confirm/", PasswordResetConfirmAPIView.as_view(), name="password-reset-confirm"),
]

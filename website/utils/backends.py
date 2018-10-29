from django.contrib.auth import get_user_model
from django.contrib.auth import backends


class MobileBackend(backends.ModelBackend):
    """
    Authenticates against settings.AUTH_USER_MODEL.
    """

    def authenticate(self, phone=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(phone=phone)
            return user
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            # UserModel().set_password(password)
            pass
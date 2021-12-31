from djoser.email import PasswordResetEmail, PasswordChangedConfirmationEmail, ActivationEmail
import environ
env = environ.Env()


class CustomPasswordResetEmail(PasswordResetEmail):
    def get_context_data(self):
        context = super().get_context_data()
        context['domain'] = env('REACT_APP_FRONT_URL')
        context['protocol'] = 'http'

        return context

class CustomPasswordChangedConfirmationEmail(PasswordChangedConfirmationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        context['domain'] = env('REACT_APP_FRONT_URL')
        context['protocol'] = 'http'

        return context

class CustomActivationEmail(ActivationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        context['domain'] = env('REACT_APP_FRONT_URL')
        context['protocol'] = 'http'

        return context

import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class Query(graphene.ObjectType):
    user_details = graphene.List(UserType)

    def resolve_user_details(root, info):
        return User.objects.all()

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()

class Mutation(AuthMutation, graphene.ObjectType):
    pass
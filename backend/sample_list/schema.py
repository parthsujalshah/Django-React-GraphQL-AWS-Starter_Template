import graphene
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from .models import ListItem
from graphql_jwt.decorators import login_required
from graphene_file_upload.scalars import Upload


class ListItemType(DjangoObjectType):
    class Meta:
        model = ListItem
        fields = ['id', 'title', 'description', 'author', 'image']


class Query(graphene.ObjectType):

    all_items_by_user = graphene.List(ListItemType)
    item_details = graphene.Field(ListItemType, id=graphene.Int(required=True))

    list_all = graphene.List(ListItemType)

    @login_required
    def resolve_all_items_by_user(root, info):
        return ListItem.objects.filter(author=info.context.user)

    @login_required
    def resolve_item_details(root, info, id):
        user_list_items = ListItem.objects.filter(author=info.context.user)
        return user_list_items.get(id=id)

    def resolve_list_all(root, info):
        return ListItem.objects.all()


class CreateListItemMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()

    list_item = graphene.Field(ListItemType)

    @classmethod
    @login_required
    def mutate(cls, root, info, title, description):
        list_item = ListItem(title=title, description=description, author=info.context.user)
        list_item.save()
        return CreateListItemMutation(list_item=list_item)


class UpdateListItemMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        title = graphene.String(required=False)
        description = graphene.String()

    list_item = graphene.Field(ListItemType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id, title, description):
        user_list_items = ListItem.objects.filter(author=info.context.user)
        list_item = user_list_items.get(id=id)
        list_item.title = title
        list_item.description = description
        list_item.save()
        return UpdateListItemMutation(list_item=list_item)


class DeleteListItemMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    list_item = graphene.Field(ListItemType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        user_list_items = ListItem.objects.filter(author=info.context.user)
        list_item = user_list_items.get(id=id)
        list_item.delete()
        return


class PictureUploadMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        image = Upload(required=True)

    list_item = graphene.Field(ListItemType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id, image):
        user_list_items = ListItem.objects.filter(author=info.context.user)
        list_item = user_list_items.get(id=id)
        list_item.image = image
        list_item.save()
        return PictureUploadMutation(list_item=list_item)


class Mutation(graphene.ObjectType):
    create_item = CreateListItemMutation.Field()
    update_item = UpdateListItemMutation.Field()
    delete_item = DeleteListItemMutation.Field()
    picture_upload = PictureUploadMutation.Field()

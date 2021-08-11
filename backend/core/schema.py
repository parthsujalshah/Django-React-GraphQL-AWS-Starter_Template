import users.schema
import sample_list.schema
import graphene

class Mutation(users.schema.Mutation, sample_list.schema.Mutation, graphene.ObjectType):
    pass

class Query(users.schema.Query, sample_list.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
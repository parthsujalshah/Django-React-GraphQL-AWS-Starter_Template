from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from graphene_file_upload.django import FileUploadGraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('api/graphql/file-upload/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True)))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
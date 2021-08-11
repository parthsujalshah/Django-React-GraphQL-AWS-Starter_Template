from django.db import models
from django.contrib.auth.models import User


class ListItem(models.Model):
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list')
    image = models.ImageField(upload_to='list_item_images', blank=True)

    def __str__(self):
        return self.title
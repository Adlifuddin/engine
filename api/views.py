from rest_framework import viewsets
from .serializers import GeneralSerializer
from api import models as api_models
import wordninja


# # Create your views here.
class GeneralViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        model = self.kwargs.get('model')
        lowerCase = model.lower()
        splitName = wordninja.split(lowerCase)
        name = " ".join(str(x) for x in splitName)
        names = name.title().replace(" ", "")
        models = api_models.__dict__.get(names)
        return models.objects.all()

    def get_serializer_class(self):
        model = self.kwargs.get('model')
        lowerCase = model.lower()
        splitName = wordninja.split(lowerCase)
        name = " ".join(str(x) for x in splitName)
        names = name.title().replace(" ", "")
        models = api_models.__dict__.get(names)
        GeneralSerializer.Meta.model = models
        return GeneralSerializer



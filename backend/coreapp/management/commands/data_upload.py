import json
from django.core.management.base import BaseCommand
from payment_method.models import PaymentMethod


class Command(BaseCommand):
    help = 'Upload PaymentMethod data from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help="Path to the JSON file")

    def handle(self, *args, **options):
        json_file = options['json_file']

        with open(json_file, 'r') as file:
            packages_data = json.load(file)

        for package_data in packages_data:
            image_id = package_data.pop('logo_id', None)

            image_instance = None
            if image_id is not None:
                from coreapp.models import Document
                image_instance = Document.objects.get(pk=image_id)

            if image_id:
                package, created = PaymentMethod.objects.get_or_create(image=image_instance, **package_data)
            else:
                package, created = PaymentMethod.objects.get_or_create(**package_data)

            if created:
                self.stdout.write(self.style.SUCCESS(f'PaymentMethod "{package.name}" created successfully'))
            else:
                self.stdout.write(self.style.SUCCESS(f'PaymentMethod "{package.name}" already exists, updating...'))
                PaymentMethod.objects.filter(id=package.id).update(**package_data)

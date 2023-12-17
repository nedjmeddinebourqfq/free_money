import json
from django.core.management.base import BaseCommand
from offer_partner.models import OfferPartner


class Command(BaseCommand):
    help = 'Upload OfferPartner data from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help="Path to the JSON file")

    def handle(self, *args, **options):
        json_file = options['json_file']
        with open(json_file, 'r') as file:
            offer_partner_data = json.load(file)
        for offer_partner_data_entry in offer_partner_data:
            offer_partner, created = OfferPartner.objects.get_or_create(**offer_partner_data_entry)
            if created:
                self.stdout.write(self.style.SUCCESS(f'OfferPartner "{offer_partner.title}" created successfully'))
            else:
                self.stdout.write(
                    self.style.SUCCESS(f'OfferPartner "{offer_partner.title}" already exists, updating...'))
                OfferPartner.objects.filter(id=offer_partner.id).update(**offer_partner_data_entry)

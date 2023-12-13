from django_filters import rest_framework as dj_filters
from ..models import Movie


class MovieFilter(dj_filters.FilterSet):
    year__gt = dj_filters.NumberFilter(field_name='year', lookup_expr='gt', label='Year Greater Than')
    year__lt = dj_filters.NumberFilter(field_name='year', lookup_expr='lt', label='Year Less Than')
    creator__username = dj_filters.CharFilter(lookup_expr='icointains')

    class Meta:
        fields = ('title', 'genre', 'year', 'year__gt', 'year__lt', 'creator__username')

#
# class CustomerProductFilter(dj_filters.FilterSet):
#     name = dj_filters.CharFilter(lookup_expr='icontains')
#     category_parent = dj_filters.NumberFilter(field_name='category__parent')
#     new = dj_filters.BooleanFilter(method='filter_new')
#     price = dj_filters.RangeFilter()
#     sort = dj_filters.ChoiceFilter(
#         choices=[
#             # Done: sorting by name also needed
#             ('cost_low', 'cost_high'),
#             ('cost_high', 'cost_low'),
#             ('rating_high', 'rating_low'),
#             ('rating_low', 'rating_high'),
#             ('name_asc', 'Name: A to Z'),
#             ('name_desc', 'Name: Z to A'),
#         ], method='filter_sort')
#
#     class Meta:
#         model = Product
#         fields = ('name', 'category', 'brand')
#
#     def filter_new(self, queryset, name, value):
#         return queryset.order_by('-created_at')
#
#     def filter_sort(self, queryset, name, value):
#         if value == 'cost_low':
#             return queryset.order_by('price')
#         elif value == 'cost_high':
#             return queryset.order_by('-price')
#         elif value == 'rating_low':
#             return queryset.order_by('average_rating')
#         elif value == 'rating_low':
#             return queryset.order_by('-average_rating')
#         elif value == 'name_asc':
#             return queryset.order_by('name')
#         elif value == 'name_desc':
#             return queryset.order_by('-name')
#         else:
#             return queryset

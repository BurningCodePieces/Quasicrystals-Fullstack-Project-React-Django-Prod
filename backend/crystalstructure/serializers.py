from rest_framework import serializers
from . models import *
from accounts.serializers import CurrentUserSerializer
import re
  
class QuasicrystalSerializer(serializers.ModelSerializer):
    created_by = CurrentUserSerializer()
    class Meta:
        model = Quasicrystal
        fields = ['id','crystal_id', 'chemical_formula', 'refined_formula', 'distance_in_periodic_direction',
        'edge_length', 'phasson_coefficient', 'residual_electron_density',
        'point_density', 'number_of_electrons_per_atom', 'authors',
        'title_of_publication', 'journal_of_publication', 'journal_volume',
        'jounal_issue','year_of_publication','start_page_or_page_range',
        'url_to_article','diffraction_temperature','radiation_type',
        'diffraction_radiation_wavelength','number_of_observed_reflections',
        'number_of_unique_reflections', 'rInt', 'r1_sigma',
        'r3_sigma', 'wR1_sigma', 'wR3_sigma', 
        'number_of_reflections_1_sigma', 'number_of_parameters',
        'r_factor_value', 'is_valid', 'quasi_type',
        'centering_type', 'cluster_type', 'created_at', 'created_by', 'five_dimensional_space_group']

class QuasicrystalPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quasicrystal
        fields = ['id','crystal_id', 'chemical_formula', 'refined_formula', 'distance_in_periodic_direction',
        'edge_length', 'phasson_coefficient', 'residual_electron_density',
        'point_density', 'number_of_electrons_per_atom', 'authors',
        'title_of_publication', 'journal_of_publication', 'journal_volume',
        'jounal_issue','year_of_publication','start_page_or_page_range',
        'url_to_article','diffraction_temperature','radiation_type',
        'diffraction_radiation_wavelength','number_of_observed_reflections',
        'number_of_unique_reflections', 'rInt', 'r1_sigma',
        'r3_sigma', 'wR1_sigma', 'wR3_sigma', 
        'number_of_reflections_1_sigma', 'number_of_parameters',
        'r_factor_value', 'is_valid', 'quasi_type',
        'centering_type', 'cluster_type', 'created_at', 'created_by', 'five_dimensional_space_group']

    def validate(self, attrs):
        if attrs['chemical_formula']=="":
            raise serializers.ValidationError(
                {'chemical_formula':'Chemical formula cannot be empty!'})
        elif sum(list(map(float,re.findall(r"[-+]?\d*\.\d+|\d+", attrs['chemical_formula'])))) !=100:
            raise serializers.ValidationError(
                {'chemical_formula':'Chemical formula elements percents should sum up to 100%.'})
        if attrs['refined_formula']!="":
            if sum(list(map(float,re.findall(r"[-+]?\d*\.\d+|\d+", attrs['refined_formula'])))) !=100:
                raise serializers.ValidationError(
                    {'refined_formula':'Refined formula elements percents should sum up to 100%.'})
        if attrs['residual_electron_density']:
            if not (0.0 <= float(attrs['residual_electron_density']) <= 100.0):
                raise serializers.ValidationError(
                    {'residual_electron_density':'Residual electron density should be a percent and therefore should be in range [0,100]'})
        if 'year_of_publication' in attrs.keys():
            if len(str(attrs['year_of_publication']))!=4:
                raise serializers.ValidationError(
                    {'year_of_publication':'Year should be 4 digit number.'})
            elif not (1900 <= float(attrs['year_of_publication']) <= 2100 ):
                raise serializers.ValidationError(
                    {'year_of_publication':'Year should be in range [1900,2100]'})
        if attrs['start_page_or_page_range']:
            if not re.match(r"^[0-9]+(-?[0-9]+)?$", attrs['start_page_or_page_range']):
                raise serializers.ValidationError(
                        {'start_page_or_page_range':'Provide valid starting page or page range.'})
        if 'number_of_observed_reflections' in attrs.keys():
            if int(attrs['number_of_observed_reflections']) < 0:
                raise serializers.ValidationError(
                        {'number_of_observed_reflections':'This field cannot be negative.'})
        if 'number_of_unique_reflections' in attrs.keys():
            if int(attrs['number_of_unique_reflections']) < 0:
                raise serializers.ValidationError(
                        {'number_of_unique_reflections':'This field cannot be negative.'})
        if 'number_of_reflections_1_sigma' in attrs.keys():
            if int(attrs['number_of_reflections_1_sigma']) < 0:
                raise serializers.ValidationError(
                        {'number_of_reflections_1_sigma':'This field cannot be negative.'})
        if 'number_of_reflections_3_sigma' in attrs.keys():
            if int(attrs['number_of_reflections_3_sigma']) < 0:
                raise serializers.ValidationError(
                        {'number_of_reflections_3_sigma':'This field cannot be negative.'})
        if 'number_of_parameters' in attrs.keys():
            if int(attrs['number_of_parameters']) < 0:
                raise serializers.ValidationError(
                        {'number_of_parameters':'This field cannot be negative.'})
        if 'is_valid' in attrs.keys():
            raise serializers.ValidationError(
                    {'is_valid':'This field cannot be set by user.'})
        if 'created_at' in attrs.keys():
            raise serializers.ValidationError(
                    {'created_at':'This field cannot be set by user.'})
        if 'id' in attrs.keys():
            raise serializers.ValidationError(
                    {'id':'This field cannot be set by user.'})
        if attrs['quasi_type']:
            if attrs['quasi_type'] not in ['icoshaedral','decagonal','dodecagonal','octagonal']:
                raise serializers.ValidationError(
                    {'quasi_type':'Value in this field should be equal "icoshaedral", "decagonal", "dodecagonal" or "octagonal".'})
        if attrs['centering_type']:
            if attrs['centering_type'] not in ['F',"P"]:
                raise serializers.ValidationError(
                    {'centering_type':'Value in this field should be equal "P" or "F".'})
        if attrs['cluster_type']:
            if attrs['cluster_type'] not in ['Bergman', 'Tsai', 'Mackay']:
                raise serializers.ValidationError(
                    {'cluster_type':'Value in this field should be equal "Mackay", "Tsai" or "Bergman".'})
        if attrs['quasi_type']:
            if attrs['quasi_type'] == "icoshaedral":
                if attrs['centering_type'] == "":
                    raise serializers.ValidationError(
                        {'centering_type':'This field cannot be empty when structure is marked as icoshaedral'})
                if attrs['cluster_type'] == "":
                    raise serializers.ValidationError(
                        {'cluster_type':'This field cannot be empty when structure is marked as icoshaedral'})
            else:
                if attrs['cluster_type'] != "":
                    raise serializers.ValidationError(
                        {'centering_type':'This field has to be empty when structure is NOT marked as icoshaedral'})
                if attrs['centering_type'] != "P":
                    raise serializers.ValidationError(
                        {'centering_type':'This field should be "P" when structure is NOT marked as icoshaedral'})
            if attrs['quasi_type']:
                if attrs['quasi_type']=="icoshaedral":
                    if attrs['centering_type'] == "P":
                        if attrs['cluster_type'] == "Mackay":
                            if attrs['crystal_id'] != "IMP":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                        elif attrs['cluster_type'] == "Bergman":
                            if attrs['crystal_id'] != "IBP":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                        elif attrs['cluster_type'] == "Tsai":
                            if attrs['crystal_id'] != "ITP":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    elif attrs['centering_type'] == "F":
                        if attrs['cluster_type'] == "Mackay":
                            if attrs['crystal_id'] != "IMF":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                        elif attrs['cluster_type'] == "Bergman":
                            if attrs['crystal_id'] != "IBF":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                        elif attrs['cluster_type'] == "Tsai":
                            if attrs['crystal_id'] != "ITF":
                                raise serializers.ValidationError(
                                    {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    else:
                        raise serializers.ValidationError(
                            {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                        
                else:
                    if attrs['quasi_type'] == "decagonal":
                        if attrs['crystal_id'] != "DP":
                            raise serializers.ValidationError(
                                {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    elif attrs['quasi_type'] == "dodecagonal":
                        if attrs['crystal_id'] != "DdP":
                            raise serializers.ValidationError(
                                {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    elif attrs['quasi_type'] == "octagonal":
                        if attrs['crystal_id'] != "OP":
                            raise serializers.ValidationError(
                                {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    else:
                        raise serializers.ValidationError(
                                {'crystal_id':'The crystal identificator (crystal_id) did not match set data!'})
                    
                    


        if attrs['rInt']:
            if not (0.0 <= float(attrs['rInt']) <= 1.0):
                raise serializers.ValidationError(
                    {'rInt':'Value in this field should be in range [0,1].'})
        if attrs['r1_sigma']:
            if not (0.0 <= float(attrs['r1_sigma']) <= 1.0):
                raise serializers.ValidationError(
                    {'r1_sigma':'Value in this field should be in range [0,1].'})
        if attrs['r3_sigma']:
            if not (0.0 <= float(attrs['r3_sigma']) <= 1.0):
                raise serializers.ValidationError(
                    {'r3_sigma':'Value in this field should be in range [0,1].'})
        if attrs['wR1_sigma']:
            if not (0.0 <= float(attrs['wR1_sigma']) <= 1.0):
                raise serializers.ValidationError(
                    {'wR1_sigma':'Value in this field should be in range [0,1].'})
        if attrs['wR3_sigma']:
            if not (0.0 <= float(attrs['wR3_sigma']) <= 1.0):
                raise serializers.ValidationError(
                    {'wR3_sigma':'Value in this field should be in range [0,1].'})
        if attrs['r_factor_value']:
            if not (0.0 <= float(attrs['r_factor_value']) <= 1.0):
                raise serializers.ValidationError(
                    {'r_factor_value':'Value in this field should be in range [0,1].'})
        
        return super().validate(attrs)
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return Quasicrystal.objects.create(**validated_data)
        
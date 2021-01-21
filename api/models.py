# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class AccountTarget(models.Model):
    dates = models.DateField(primary_key = True)
    apac = models.IntegerField()
    emea = models.IntegerField()
    na = models.IntegerField()
    anzo = models.IntegerField()

    class Meta:
        db_table = 'account_target'


class Fb7Days(models.Model):
    dates = models.DateField(primary_key = True)
    engaged_user = models.FloatField()
    page_impressions = models.FloatField()
    total_page_like = models.FloatField()
    fb_new_page = models.FloatField()

    class Meta:
        db_table = 'fb7days'



class FbEngagedUserImpressions(models.Model):
    item = models.CharField(max_length=50, primary_key = True)
    currents = models.FloatField()
    previous = models.FloatField()
    percentage = models.FloatField()

    class Meta:
        db_table = 'fbengageduser_impressions'



class FbPageLike(models.Model):
    item = models.CharField(max_length=50, primary_key = True)
    current_fb_page_likes = models.FloatField()
    previous_fb_page_likes = models.FloatField()
    fb_page_likes_percentage = models.FloatField()
    new_fb_page_likes = models.FloatField()
    new_fb_page_previous_likes = models.FloatField()
    fb_newpage_percentage = models.FloatField()

    class Meta:
        db_table = 'fbpagelike'



class Finance(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()
    plan_amount = models.FloatField()
    vs_last_year = models.CharField(max_length=50)
    amount_last_year = models.FloatField()

    class Meta:
        db_table = 'finance'


class GaAudienceMetric(models.Model):
    dates = models.DateField(primary_key = True)
    users = models.IntegerField()
    sessions = models.IntegerField()
    page_views = models.IntegerField()

    class Meta:
        db_table = 'gaaudiencemetric'




class Gabounce(models.Model):
    status_bounce = models.CharField(max_length=50, primary_key = True)
    value_bounce = models.FloatField()

    class Meta:
        db_table = 'gabounce'



class GaChannel(models.Model):
    channel = models.CharField(max_length=50, primary_key = True)
    sessions = models.FloatField()
    previous_period = models.FloatField()
    changes = models.FloatField()

    class Meta:
        db_table = 'gachannel'



class GaChannelGoal(models.Model):
    dates = models.DateField(primary_key = True)
    organic_search_trend = models.FloatField()
    display_trend = models.FloatField()
    direct_trend = models.FloatField()
    paid_search_trend = models.FloatField()
    referral_trend = models.FloatField()
    contact_us_trend = models.FloatField()
    proposal_trend = models.FloatField()
    proposal_step2_trend = models.FloatField()
    call_in_trend = models.FloatField()

    class Meta:
        db_table = 'gachannel_goal'



class GaGoal(models.Model):
    goal = models.CharField(max_length=50, primary_key = True)
    completions = models.FloatField()
    conversions_rate = models.FloatField()
    previous_period = models.FloatField()
    changes = models.FloatField()

    class Meta:
        db_table = 'gagoal'



class GaNewSessions(models.Model):
    status = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()

    class Meta:
        db_table = 'ganewsessions'



class GaPageViews(models.Model):
    status = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()

    class Meta:
        db_table = 'gapageviews'



class GaPageViewsTarget(models.Model):
    target = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()

    class Meta:
        db_table = 'gapageviewstarget'



class GaPerformanceMetric(models.Model):
    dates = models.DateField(primary_key = True)
    bounce_rate_avg = models.FloatField()
    page_views = models.FloatField()
    new_sessions = models.FloatField()

    class Meta:
        db_table = 'gaperformancemetric'



class GaRegions(models.Model):
    top_regions = models.CharField(max_length=50, primary_key = True)
    sessions = models.IntegerField()

    class Meta:
        db_table = 'garegions'



class GaSessionsByDeviceType(models.Model):
    equipment = models.CharField(max_length=50, primary_key = True)
    percentage = models.FloatField()
    amount = models.FloatField()

    class Meta:
        db_table = 'gasessionsbydevicetype'



class GaSessionTarget(models.Model):
    targets = models.CharField(max_length=50, primary_key = True)
    target_value = models.FloatField()

    class Meta:
        db_table = 'gasessiontarget'



class GaUserTarget(models.Model):
    targets = models.CharField(max_length=50, primary_key = True)
    target_value = models.FloatField()

    class Meta:
        db_table = 'gausertarget'


class GrossProfitMargin(models.Model):
    months = models.DateField(primary_key = True)
    year2017 = models.FloatField()
    year2018 = models.FloatField()
    year2019 = models.FloatField()
    year2020 = models.FloatField()

    class Meta:
        db_table = 'gross_profit_margin'



class Hr(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    year2020 = models.FloatField()
    year2019 = models.FloatField()
    projection_year2020 = models.FloatField()

    class Meta:
        db_table = 'hr'



class LinkedIn(models.Model):
    follower_last_month = models.FloatField(primary_key = True)
    follower_prev_month = models.FloatField()
    follower_percentage = models.FloatField()
    engagement_last_month = models.FloatField()
    engagement_prev_month = models.FloatField()
    engagement_percentage = models.FloatField()
    clicks_last_month = models.FloatField()
    clicks_prev_month = models.FloatField()
    clicks_percentage = models.FloatField()

    class Meta:
        db_table = 'linkedin'



class LinkedInClick(models.Model):
    dates = models.DateField(primary_key = True)
    followers = models.IntegerField()
    engagement = models.FloatField()
    clicks = models.IntegerField()

    class Meta:
        db_table = 'linkedin_click'


class Marketing(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()
    plan_amount = models.FloatField()
    vs_last_year = models.CharField(max_length=50)
    amount_last_year = models.FloatField()

    class Meta:
        db_table = 'marketing'


class MonthlySalesDashboard(models.Model):
    dates = models.DateField()
    category = models.CharField(max_length=50, primary_key = True)
    leads = models.IntegerField(blank=True, null=True)
    trial = models.IntegerField(blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)
    total_services = models.IntegerField(blank=True, null=True)
    mrr_expansion = models.IntegerField(blank=True, null=True)
    mrr_newbusiness = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'monthly_sales_dashboard'


class MonthlySalesTotalTarget(models.Model):
    total = models.IntegerField(blank=True, primary_key = True)
    target = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'monthly_sales_total_target'


class NetProfitMargin(models.Model):
    months = models.DateField(primary_key = True)
    year2017 = models.FloatField()
    year2018 = models.FloatField()
    year2019 = models.FloatField()
    year2020 = models.FloatField()

    class Meta:
        db_table = 'net_profit_margin'


class NewAccounts(models.Model):
    account_name = models.CharField(max_length=50, primary_key = True)
    account_seats = models.FloatField()

    class Meta:
        db_table = 'newaccounts'


class Products(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()
    vs_last_year = models.CharField(max_length=50)

    class Meta:
        db_table = 'products'


class Sales(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()
    plan_amount = models.FloatField()
    vs_last_year = models.CharField(max_length=50)
    amount_last_year = models.FloatField()

    class Meta:
        db_table = 'sales'


class ServiceProduct(models.Model):
    tickets = models.CharField(max_length=50, primary_key = True)
    amount = models.FloatField()
    amount_last_year = models.FloatField()

    class Meta:
        db_table = 'service_product'


class SocialMediaConversion(models.Model):
    dates = models.DateField(primary_key = True)
    web_visits = models.IntegerField()
    conversions = models.IntegerField()
    conversions_rate = models.FloatField()

    class Meta:
        db_table = 'social_media_conversion'


class SocialMediaFollowers(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    followers = models.FloatField()
    conversions = models.FloatField()
    conversions_changes = models.FloatField()
    sessions = models.FloatField()
    sessions_changes = models.FloatField()
    conversions_rate = models.FloatField()

    class Meta:
        db_table = 'social_media_followers'


class Target(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    total = models.FloatField()
    target = models.FloatField()

    class Meta:
        db_table = 'target'


class Total(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    revenue = models.FloatField()
    debt = models.FloatField()
    equity = models.FloatField()
    debt_to_equity = models.FloatField()
    return_to_equity = models.FloatField()

    class Meta:
        db_table = 'total'


class TotalTarget(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    total = models.FloatField()
    target = models.FloatField()

    class Meta:
        db_table = 'total_target'


class Videostat(models.Model):
    items = models.CharField(max_length=50, primary_key = True)
    total_social_media_conversions = models.FloatField()
    previous_30days = models.FloatField()
    vs_previous_30days = models.FloatField()

    class Meta:
        db_table = 'videostat'


class Youtube30Days(models.Model):
    dates = models.DateField(primary_key = True)
    channel_views = models.FloatField()
    gain_subscribers = models.FloatField()
    loss_subscribers = models.FloatField()
    bitlys_new_links = models.FloatField()
    bitlys_new_clicks = models.FloatField()

    class Meta:
        db_table = 'youtube30days'

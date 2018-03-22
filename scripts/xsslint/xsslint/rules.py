class Rule(object):
    def __init__(self, rule_id):
        self.rule_id = rule_id


class RuleSet(object):
    def __init__(self, **kwargs):
        self.ruleset = {}
        for k, v in kwargs.items():
            self.ruleset[k] = Rule(v)

    def __getattr__(self, attr_name):
        return self.ruleset[attr_name]

    def __add__(self, other):
        result = self.__class__()
        result.ruleset.update(self.ruleset)
        result.ruleset.update(other.ruleset)
        return result


# IMPORTANT: Do not edit without also updating the docs:
# - http://edx.readthedocs.org/projects/edx-developer-guide/en/latest/conventions/preventing_xss.html#xss-linter
Rules = RuleSet(
    mako_missing_default='mako-missing-default',
    mako_multiple_page_tags='mako-multiple-page-tags',
    mako_unparseable_expression='mako-unparseable-expression',
    mako_unwanted_html_filter='mako-unwanted-html-filter',
    mako_invalid_html_filter='mako-invalid-html-filter',
    mako_invalid_js_filter='mako-invalid-js-filter',
    mako_js_missing_quotes='mako-js-missing-quotes',
    mako_js_html_string='mako-js-html-string',
    mako_html_entities='mako-html-entities',
    mako_unknown_context='mako-unknown-context',
    underscore_not_escaped='underscore-not-escaped',
    javascript_jquery_append='javascript-jquery-append',
    javascript_jquery_prepend='javascript-jquery-prepend',
    javascript_jquery_insertion='javascript-jquery-insertion',
    javascript_jquery_insert_into_target='javascript-jquery-insert-into-target',
    javascript_jquery_html='javascript-jquery-html',
    javascript_concat_html='javascript-concat-html',
    javascript_escape='javascript-escape',
    javascript_interpolate='javascript-interpolate',
    python_concat_html='python-concat-html',
    python_custom_escape='python-custom-escape',
    python_deprecated_display_name='python-deprecated-display-name',
    python_requires_html_or_text='python-requires-html-or-text',
    python_close_before_format='python-close-before-format',
    python_wrap_html='python-wrap-html',
    python_interpolate_html='python-interpolate-html',
    python_parse_error='python-parse-error',
)

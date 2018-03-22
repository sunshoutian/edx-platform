class Rule(object):
    def __init__(self, rule_id):
        self.rule_id = rule_id

    def __eq__(self, other):
        return self.rule_id == other.rule_id

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

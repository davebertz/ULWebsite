import unidecode
a = [{'headOrTail': 0}, {'numericalSequences': ['', '']}, {'fortuneWheel': 0}, {'CanadianQuestion': ['a', 'éé', 'ééé']}, {'timerWord': ''}, {'memoryQuestion': ''}]

a[3] =  {"CanadianQuestion" :[unidecode.unidecode(x) for x in a[3]['CanadianQuestion']]}
print(a)
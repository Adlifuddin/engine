def unpack(resource):
    ti = []
    for item in resource:
        title = list(item.keys())
        ti.append(title)
    titles = []
    for i in ti[0]:
        names = i.replace(" ", "")
        name = names.replace("/", "")
        m = name.replace("(","")
        n = m.replace(")","")
        r = n.replace("\n", "")
        titles.append(r)
    l = " VARCHAR , ".join(titles)
    titlehead = f" {l} VARCHAR "
    
    return titlehead
  
def createTitle(title):
    ti = []
    for item in title:
        title = list(item.keys())
        ti.append(title)
    titles = []
    for i in ti[0]:
        names = i.replace(" ", "")
        name = names.replace("/", "")
        m = name.replace("(","")
        n = m.replace(")","")
        r = n.replace("\n", "")
        titles.append(r)
    l = " , ".join(titles)
    titlehead = f" {l} "
    return titlehead
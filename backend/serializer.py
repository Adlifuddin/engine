from .connection import CreateConnectionCoreUser

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

def validateName(name):
    conn = CreateConnectionCoreUser().connect()
    query = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';") # This line performs query and returns json result
    data = [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]
    h = []
    for i in data:
        names = list(i.values())
        n = ''.join(names)
        h.append(n)
    return name in h
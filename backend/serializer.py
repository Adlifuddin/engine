from .connection import CreateConnectionCoreUser
import jwt, datetime

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

def parseFloat(results, name):
    li = []
    for item in results:
        if item[name] is None:
            item[name] = float(0)
        else :
            item[name] = float(item[name])
        li.append(item)
    return li

def encode_auth_token(payload):
    METABASE_JWT_SHARED_SECRET = "4f866b9f30bdcb0c00cc099b8c3575b4297e7dac3ff0f9e108e5ba82909639d6";
    try:
        return jwt.encode(
            payload,
            METABASE_JWT_SHARED_SECRET,
        )
    except Exception as e:
        return e
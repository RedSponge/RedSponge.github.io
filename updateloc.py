import os

currentpath = "file:\\\\" + os.path.dirname(os.path.abspath(__file__))
domain = "https://RedSponge.github.io"

navfile = open("nav.html", "r+")
contents = navfile.read()
navfile.close()
a = raw_input("L(ocal) or U(niversal)?").upper()

tofind = ""
replaceto = ""
if a == "L":
    tofind = domain
    toreplace = currentpath
elif a == "U":
    tofind = currentpath
    toreplace = domain
else:
    raise Exception("You didn't choose U or L")

contents = contents.replace(tofind, toreplace)
navfile = open("nav.html", "w")
navfile.write(contents)
navfile.close()
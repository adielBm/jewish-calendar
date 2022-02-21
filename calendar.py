import math

def getMonthsSinceCycle(num):
    leapYears = [3, 6, 8, 11, 14, 17, 19]
    months = 0
    for y in range(num):
        if y+1 in leapYears:
            months += 13
        else:
            months += 12
    return months

# Get the number of months since the Molad of "Bahard".
def getMonthsSinceBaharad(year):
    year -= 1
    (re, cycles) = math.modf(year / 19)
    return getMonthsSinceCycle(round(19 * re)) + (cycles * 235)

def getMoladTishrei(year):

    HOUR_AS_PARTS = 1080
    DAY_AS_PARTS = HOUR_AS_PARTS * 24
    WEEK_AS_PARTS = DAY_AS_PARTS * 7 # 181440
    MONTH_AS_PARTS = (DAY_AS_PARTS * 29) + (HOUR_AS_PARTS * 12) + 793

    # Remainder of MONTH after removal of the entire weeks. (Week Modulo)
    REMNANT_MONTH = MONTH_AS_PARTS % WEEK_AS_PARTS  # 39673

    # Molad "Baharad": (2 days. 5 hours. 204 parts )
    BAHARAD = (DAY_AS_PARTS * 2) + (HOUR_AS_PARTS * 5) + 204  # 57444

    # Molad Tishrei as parts.
    mtParts = BAHARAD + (getMonthsSinceBaharad(year) * REMNANT_MONTH)
    # Molad Tishrei after Week Modulo:
    mtParts = mtParts % WEEK_AS_PARTS

    (re, dayMt) = math.modf(mtParts / DAY_AS_PARTS)
    (re, hoursMt) = math.modf(re * 24)
    partsMt = re * 1080

    return f" Day: {round(dayMt)} \n Hours: {round(hoursMt)} \n Parts: {round(partsMt)}"


# Examples:

print(getMoladTishrei(5782))
# Day: 3, Hours: 5, Parts: 497

print(getMoladTishrei(5783))
# Day: 2, Hours: 3, Parts: 6

print(getMoladTishrei(5784))
# Day: 6, Hours: 11, Parts: 882
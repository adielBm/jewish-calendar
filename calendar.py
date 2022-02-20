import math

 # Get the number of months since the Molad of "Bahard".
def getMonthsSinceBaharad(year):
  return round(((235 * (year - 1)) + 1) / 19)

def getMoladTishrei(year):

  HOUR_AS_PARTS = 1080
  DAY_AS_PARTS = HOUR_AS_PARTS * 24
  WEEK_AS_PARTS = DAY_AS_PARTS * 7
  MONTH_AS_PARTS = (DAY_AS_PARTS * 29) + (HOUR_AS_PARTS * 12) + 793

  # Remainder of MONTH after removal of the entire weeks. (Week Modulo)
  REMNANT_MONTH = MONTH_AS_PARTS % WEEK_AS_PARTS # 39673

  # Molad "Baharad": (2 days. 5 hours. 204 parts )
  BAHARAD = (DAY_AS_PARTS * 2) + (5 * HOUR_AS_PARTS) + 204 # 57444


  # Molad Tishrei as parts.
  mtParts = BAHARAD + (getMonthsSinceBaharad(year) * REMNANT_MONTH)
  # Molad Tishrei after Week Modulo: 
  mtParts = mtParts % WEEK_AS_PARTS

  (re ,dayMt) = math.modf((mtParts / DAY_AS_PARTS))
  (re ,hoursMt) = math.modf(re * 24)
  partsMt = re * 1080

  return f" Day: {round(dayMt)} \n Hours: {round(hoursMt)} \n Parts: {round(partsMt)}"

# Example:
print(getMoladTishrei(5770))


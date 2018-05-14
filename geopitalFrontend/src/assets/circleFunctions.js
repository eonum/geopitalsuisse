
/**
 * Gives markers different color according to its type attribute
 * @param d data which is displayed as a circle
 * @returns {string} color of the marker (according to type)
 */
function getCircleColour(d) {
    if (d.Typ == "K111") // Universitätspitäler
      return ('#a82a2a');
    if (d.Typ == "K112") // Zentrumsspitäler
      return ('#a89f2a');
    if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
      return ('#2ca82a');
    if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
      return ('#2a8ea8');
    if (d.Typ == "K221") // Rehabilitationskliniken
      return ('#2c2aa8');
    if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
      return ('#772aa8');
    else
      return ('#d633ff');
  }
  export default getCircleColour;
  
  /**
   * Gives markers different border color according to its type attribute
   * @param d data which is displayed as a circle
   * @returns {string} color of the border of the marker (according to type)
   */
  function returnColouredBorders(d) {
    if (d.Typ == "K111") // Universitätspitäler
      return ('#a82a2a')
    if (d.Typ == "K112") // Zentrumsspitäler
      return ('#a89f2a')
    if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
      return ('#2ca82a')
    if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
      return ('#2a8ea8')
    if (d.Typ == "K221") // Rehabilitationskliniken
      return ('#2c2aa8')
    if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
      return ('#772aa8')
    else
      return ('#d633ff');
  }
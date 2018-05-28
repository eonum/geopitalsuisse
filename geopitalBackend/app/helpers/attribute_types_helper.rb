module AttributeTypesHelper

  def read_and_store_attribute_types(sheet)
    @types = Array.new
    @desc = ['','','']
    i = 1
    s = 'string'
    while i < sheet.rows.length
      row = sheet.row(i)
      if row[0].present?
        if row[1].present?
          @code = (row[0]+row[1])
        else
          @code = (row[0])
        end
      else
        if row[2].present?
          s = 'number'
          if row[2] == 'Akutbehandlung' || row[2] == 'Psychiatrie' || row[2] == 'Rehabilitation / Geriatrie' || row[2] == 'Geburtshaus'
            @desc[0] = row[2] + ': '
            @desc[1] = row[3] + ': '
            @desc[2] = row[4] + ': '
          end
        end
      end
      if @code == 'AnzStand'
        s = 'number'
      end
      if @code == 'SA'
        s = 'string'
      end
      if @code == 'Amb' || @code == 'Stat' || @code == 'Amb, Stat' || @code == 'Inst, Adr, Ort' || @code == 'KT' || @code == 'Standort' || @code.equal?('KZ-Code')
        i += 1
        next
      end
      if !AttributeType.where(code: @code).exists?
        @types << AttributeType.create(code: @code, nameDE: @desc[0]+row[2], nameFR: @desc[1]+row[3], nameIT: @desc[2]+row[4], category: s)
      end
      i += 1
    end
    return @types
  end

end

require 'oj'
include ApiHelper

class ApiController < ApplicationController
  def hospitals
    render :json => create_json()
  end

  def attributeTypes
    render :json => {:attribute_types_string => AttributeType.where(:category => "string"), :attribute_types_number => AttributeType.where(:category => "number")}
  end
end

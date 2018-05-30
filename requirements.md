# 1 Introduction
## 1.1 Purpose
The purpose of the system is to compare and visualize informations about hostpitals on a geographical map. The user should be able to select different attributes and they should visualize on the map to give the user a benchmark of the hospitals. In order to achieve this we use the official data from the BAG (bag.admin.ch).
## 1.2 Stakeholders
- User: Casemanagers of health insurances and other employees in the public health sector: View the map, select attributes, compare hospitals; low to middle computer abilities
- Admin: eonum employee: Manage the data, maintain the code, define new attribute types, add new features
## 1.3 Definitions
## 1.4 System Overview
Frontend: Based on AngularJS, displays hospitals and attributes on a switzerland map, user can select attributes to display
Backend: Based on Ruby on Rails, stores and manages the data, allow data import, definitions of new attribute types
## 1.5 References
Project description Geopital from eonum
# 2 Overall Description
## 2.1 Use Cases
### 2.1.1 User
- Display map with location of all hospitals
- Zoom in
- Selecting attribute, display the selected attributes on the map with size, color
- View hospital profiles
### 2.1.2 Admin
- Import new data
- Manage data (add, edit, delete)
- Add new attribute types
## 2.2 Actor Characteristics
User: easy understandable without reading a manual, fast response
Admin: easy to maintain application and data
# 3 Specific Requirements
## 3.1 Functional Requirements
- Display map with hospital
- Display selected atrributes of hospital on map
- Zoom the map
- Show profile of hospitals
- Import data
- Define attribute types
## 3.2 Non-functional Requirements
- Persistent data management
- High performance
- Maintainable: server-client with REST API, fully documented, automated testing, coding conventions for Ruby and AngularJS
- Usability: no user manual needed

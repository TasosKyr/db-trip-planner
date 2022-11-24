// id:"8011160"
// location:
//   id:"8011160"
//   latitude:52.524924
//   longitude:13.369629
//   type:"location"
// name:"Berlin Hbf"
// products:
//   bus:true
//   ferry:false
//   national:true
//   nationalExpress:true
//   regional:true
//   regionalExp:true
//   suburban:true
//   subway:true
//   taxi:false
//   tram:true
// type:"stop"
import { Dispatch, SetStateAction } from "react";
export type Location = {
  id: string;
  latitude: string;
  longitude: string;
  type: string;
};

export type ListItem = {
  name: string;
  location: Location;
};

export type Field = {
  label: string;
  name: string;
  type: string;
  onChangeFn: Dispatch<SetStateAction<null | ListItem>>;
  placeholder: string;
};




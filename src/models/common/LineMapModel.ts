/**
 * Created by taocong on 2017/3/29.
 */

export class LineMapGropModel{
  result:Array<LineMapModel>;
}


export class LineMapModel{

  StationName: string;
  Longitude: string;			//经度
  Latitude: string;			//纬度
  StationNo: string;
  Attribute: string;
  Distance: string;
  LineList: string;

  isStation:boolean;
  isLine:boolean;
  IsCollect:string;
  isCollect:boolean = false;
  StationGuid:string;
  CollectGuid:string = '';

}

import { VideoDBType } from "../db/video-db-type";
import { OutputErrorsType } from "./ErrorsModel";

export type OutputVideoType = VideoDBType;
export type OutputType = OutputErrorsType | OutputVideoType


// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }
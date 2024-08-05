import { IsString, MinLength } from "class-validator";


export class CreateSearchDto {
    @MinLength(2)
    @IsString()
    query: string;

}

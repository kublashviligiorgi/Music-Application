import { IsString, MinLength } from "class-validator";


export class CreateSearchDto {
    @IsString()
    word: string;

}

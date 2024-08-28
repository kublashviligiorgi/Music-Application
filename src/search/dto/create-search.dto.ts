import { IsString, MinLength } from "class-validator";


export class CreateSearchDto {
    @MinLength(1)
    @IsString()
    word: string;

}

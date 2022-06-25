import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
  @ApiProperty()
  term: string;

  @ApiProperty()
  path: string;
  
  @ApiProperty() 
  url: string;
}

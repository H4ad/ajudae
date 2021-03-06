//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsHexColor, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações que serão usadas para atualizar uma ong
 */
export class UpdateOngPayload extends BaseCrudUpdatePayload {

  /**
   * O nome dessa ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(1, { message: 'O nome da ong precisa ter ao menos um caracter.' })
  @MaxLength(255, { message: 'O nome da ong não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name?: string;

  /**
   * O e-mail da ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'É necessário enviar um e-mail contendo menos de 255 caracteres.' })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  public email?: string;

  /**
   * A cor dessa ONG
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsHexColor({ message: 'A cor dessa ONG precisa ser uma cor em Hexadecimal.' })
  public color?: string;

  /**
   * A imagem da ONG
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'A imagem da ONG precisa ser um url.' })
  @IsUrl({ }, { message: 'A imagem da ONG precisa ser um url válido.' })
  public image?: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(11, { message: 'É necessário enviar um número de telefone válido com DDD.' })
  @MaxLength(255, { message: 'O número de WhatsApp não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  // TODO: Talvez adicionar uma validação melhorar para o número de WhatsApp
  public whatsapp: string;

}

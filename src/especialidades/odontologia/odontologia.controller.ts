import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RegistroOdontogramaDto } from './dto/registro-odontograma.dto';
import { AuthGuard } from '@nestjs/passport';
import { OdontologiaService } from './odontologia.service';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { Response } from 'express';

@Controller('odontologia')
export class OdontologiaController {

    constructor(private readonly odontologiaService: OdontologiaService) {}

    @Post('registro')
    @ApiOperation({ summary: 'Registrar intervención odontológica' })
    @ApiBody({ type: RegistroOdontogramaDto })
    @ApiResponse({ status: 201, description: 'Intervención registrada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @UseGuards(AuthGuard('jwt')) // si usas JWT
    async registrar(
    @Body() dto: RegistroOdontogramaDto,
    @Req() req: RequestWithUser
    ) {
        return this.odontologiaService.registrarIntervencion(dto, req.user.id);
    }

    @Get('historial')
    @UseGuards(AuthGuard('jwt'))
    async historial(@Req() req: RequestWithUser) {
    return this.odontologiaService.obtenerHistorial(req.user.id);
    }

    @Get('evolucion/:pieza')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Evolución clínica por pieza dental' })
    @ApiParam({ name: 'pieza', example: '1.6', description: 'Identificador de la pieza dental' })
    @ApiResponse({ status: 200, description: 'Lista de intervenciones ordenadas por fecha' })
    async evolucionPorPieza(
    @Param('pieza') pieza: string,
    @Req() req: RequestWithUser
    ) {
        return this.odontologiaService.obtenerEvolucionPorPieza(req.user.id, pieza);
    }

    @Get('historial/pdf')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Exportar historial dental en PDF' })
    @ApiResponse({ status: 200, description: 'Archivo PDF generado' })
    async exportarPDF(@Res() res: Response, @Req() req: RequestWithUser) {
        const buffer = await this.odontologiaService.generarHistorialPDF(req.user.id);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="historial_dental.pdf"',
        });

        res.send(buffer);
    }

}

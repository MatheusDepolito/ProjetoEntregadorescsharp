using Microsoft.AspNetCore.Mvc;
using Mysql.Context;
using ProjetoAny.Backend.src.Models.Entidades;
using ProjetoAny.Backend.src.Models;
using ProjetoAny.utils.shared;

namespace ProjetoAny.Backend.src.Controllers
{
    [ApiController]
    [Route("entregador")]
    public class EntregadorController : ApiController
    {
        private readonly EntregadorModel entregadorModel;
        public EntregadorController(DbApp DbApp)
        {
            entregadorModel = new EntregadorModel(DbApp);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetEntregadores()
        {
            try
            {
                List<Entregador> entregadores = await this.entregadorModel.GetEntregadores();
                if (entregadores.Count != 0)
                    return ResponseOk(entregadores);
                else
                    return ResponseBadRequest("Sem entregadores.");
            }
            catch (Exception ex)
            {
                return ResponseInternalServerError(ex);
            }
        }
        [HttpGet("getByCodigo")]
        public async Task<IActionResult> GetEntregadorByCodigo([FromBody] Entregador ent)
        {
            //if(!int.TryParse(ent.Codigo.ToString(), out int codigoNum))
            //    return ResponseBadRequest("O código deve ser um número válido.");
            try
            {
                var entregador = await entregadorModel.GetEntregadorByCodigo(ent);
                if (entregador != null)
                    return ResponseOk(entregador);
                else {
                    return ResponseBadRequest("Entregador não existe.");
                }
            }
            catch( Exception ex )
            {
                return ResponseInternalServerError(ex);
            }
        }

        [HttpPost("postEntregador")]
        public async Task<IActionResult> PostEntregador([FromBody]Entregador entregador)
        {   
            //Console.WriteLine("PostEntregador");
            try
            {
                bool insertionSuccess = await entregadorModel.PostEntregador(entregador);
                if (!insertionSuccess)
                return ResponseBadRequest("Erro ao cadastrar entregador.");           
                else
                    return ResponseCreated();
            }
            catch (Exception ex)
            {
                return ResponseInternalServerError(ex.Message);
            }
        }

        [HttpDelete("deleteEntregador")]
        public async Task<IActionResult> DeleteEntregador([FromBody]Entregador ent)
        {
            try
            {
                bool deletedSuccess = await entregadorModel.DeleteEntregador(ent.Codigo);
                if(!deletedSuccess) 
                    return ResponseBadRequest("Entregador já deletado ou não existe.");
                else 
                    return ResponseOk("Entregador deletado com sucesso.");
            }
            catch (Exception ex)
            {
                return ResponseInternalServerError(ex.Message);
            }
        }
        [HttpPut("updateEntregador")]
        public async Task<IActionResult> UpdateEntregador([FromBody]Entregador ent){
            try
            {
                bool updateSuccess = await entregadorModel.UpdateEntregador(ent);

                if(!updateSuccess)
                    return ResponseBadRequest("Erro ao atualizar os dados do entregador.");
                else 
                    return ResponseOk("Entregador atualizado com sucesso.");
            }
            catch (Exception ex)
            {     
                return ResponseInternalServerError(ex.Message);
            }
        }
    }
}

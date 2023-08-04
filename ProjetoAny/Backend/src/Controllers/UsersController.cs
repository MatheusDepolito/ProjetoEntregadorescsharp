using Microsoft.AspNetCore.Mvc;
using Mysql.Context;
using ProjetoAny.Backend.src.Models.Entidades;
using ProjetoAny.Backend.src.Models;
using ProjetoAny.utils.shared;


namespace ProjetoAny.Backend.src.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ApiController
    {
        private readonly UsersModel usersModel;
        public UsersController(DbApp DbApp) 
        {
            usersModel = new UsersModel(DbApp);
        }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]Users user) 
    {
        try
        {
            var authenticatedUser = await this.usersModel.Login(user);
            if(authenticatedUser == null)
                return ResponseBadRequest("Usuario não achado.");
            else
                return ResponseOk(authenticatedUser);
        }
        catch (Exception ex)
        {
            return ResponseInternalServerError(ex.Message);
        }
    }
    [HttpPost("cadastrar")]
    public async Task<IActionResult> CadastrarUsers([FromBody]Users user)
    {
        try
        {
            bool cadastroSuccess = await this.usersModel.Register(user);
            if(!cadastroSuccess)
                return ResponseBadRequest("Erro ao cadastrar usuario.");
            else
                return ResponseCreated();
        }
        catch (Exception ex)
        {
            return ResponseInternalServerError(ex.Message);
        }
    }
    [HttpPut("updateProfile")]
    public async Task<IActionResult> UpdateProfile([FromBody]Users user)
    {
        try
        {
            bool updateProfile = await this.usersModel.UpdateProfile(user);
            if(!updateProfile)
                return ResponseBadRequest("Erro ao atualizar os dados do usuario.");  
            else 
                return ResponseOk("Usuario atualizado com sucesso.");      
        }
        catch (Exception ex)
        {          
            return ResponseInternalServerError(ex.Message);
        }

    }

    }
}
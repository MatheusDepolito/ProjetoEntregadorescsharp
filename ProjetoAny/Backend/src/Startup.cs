using Mysql.Context;

namespace ProjetoAny.Backend{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<DbApp>(provider => new DbApp("Data Source=DESKTOP-8JH0AFF;Initial Catalog=dbtest;Integrated Security=True;Pooling=False"));
            services.AddControllersWithViews();
            // Outros serviços...
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOriginPolicy",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("AllowAnyOriginPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackEndApi.Models;

namespace BackEndApi.Models
{
    public class BackEndApiContext : DbContext
    {
        public BackEndApiContext (DbContextOptions<BackEndApiContext> options)
            : base(options)
        {
        }

        public DbSet<BackEndApi.Models.User> User { get; set; }

        public DbSet<BackEndApi.Models.Photo> Photo { get; set; }
    }
}

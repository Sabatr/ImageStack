using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndApi.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BackEndApiContext(
                serviceProvider.GetRequiredService<DbContextOptions<BackEndApiContext>>()))
            {
                // Look for any users.
                if (context.User.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                context.User.AddRange(
                    new User {
                          UserName= "admin",
                          Password="admin",
                          Email="fakeEmail@gmail.com",
                          Photos = new List<Photo> {
                              new Photo {
                                  PhotoId = 1,
                                  PhotoTitle = "First Photo!",
                                  PhotoDescription = "This should be some sort of description of the photo.",
                                  PhotoUrl= "https://i.redd.it/qoclxqq0uiz11.jpg",
                                  DateMade= "20/10/2018"
                              },
                              new Photo {
                                   PhotoId = 2,
                                  PhotoTitle = "Second Photo!",
                                  PhotoDescription = "This should be some sort of description of the photo.",
                                  PhotoUrl= "https://i.redd.it/xhp7sgu9cmz11.jpg",
                                  DateMade= "22/10/2018"
                              }
                          }
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
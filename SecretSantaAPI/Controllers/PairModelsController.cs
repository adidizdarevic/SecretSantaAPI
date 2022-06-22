using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecretSantaAPI.Data;
using SecretSantaAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SecretSantaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PairModelsController : ControllerBase
    {
        private readonly DataContext _context;
        public PairModelsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<PairModel>>> Get()
        {
            return Ok(await _context.PairModels.ToListAsync());
        }
        // returns paired user y for user x
        [HttpGet("/{x}")]
        public async Task<ActionResult<int>> Get(int x)
        {
            var pair = await _context.PairModels.FirstOrDefaultAsync(req => req.X == x);
            if (pair == null) return BadRequest("0"); // no y for x
            return Ok(pair.Y);
        }
        [HttpPost]
        public async Task<ActionResult<List<PairModel>>> PostGeneratedPairs()
        {
            Random random = new Random();
            var xList = await _context.UserModels.ToListAsync();
            var yList = await _context.UserModels.ToListAsync();

            // drop table if already exists
            _context.PairModels.RemoveRange(_context.PairModels);
            await _context.SaveChangesAsync();

            while (xList.Count != 0)
            {
                bool flag = false;
                // random x
                int xPosition = random.Next(0, xList.Count);

                // x can not draw x
                if(yList.Remove(yList.Find(delete => delete.Id == xList[xPosition].Id)))
                    flag = true;

                // special and only case when x can only draw himself and stays without y
                if (yList.Count == 0) break;

                // random y and make a pair
                int yPosition = random.Next(0, yList.Count);
                PairModel par = new PairModel(xList[xPosition].Id, yList[yPosition].Id);
                _context.PairModels.Add(par);

                // remove y 
                yList.Remove(yList.Find(delete => delete.Id == yList[yPosition].Id));

                // return the x into y
                if(flag)
                    yList.Add(xList[xPosition]);

                // remove x and then next
                xList.RemoveAt(xPosition);

                System.Diagnostics.Debug.WriteLine("\nPairs id's x:" + par.X + "- y:" + par.Y);
                System.Diagnostics.Debug.WriteLine("X list: ");
                xList.ForEach(i => System.Diagnostics.Debug.Write(i.Id + ","));
                System.Diagnostics.Debug.WriteLine("\nY list: ");
                yList.ForEach(i => System.Diagnostics.Debug.Write(i.Id + ","));

            }

            await _context.SaveChangesAsync();
            return Ok(await _context.PairModels.ToListAsync());
        }

    }
}

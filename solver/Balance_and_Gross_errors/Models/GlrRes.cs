using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Balance_and_Gross_errors.Models
{
    public class GlrRes
    {
        public string Status { get; set; }
        public double Time { get; set; }
        public List<Glr> Data { get; set; }
    }
}

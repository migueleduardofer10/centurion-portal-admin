using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Helper
{

    public class ErrorTracking
    {

        public ErrorTracking()
        {
            this.errors = new Dictionary<string, string[]>();
        }


        private static string Split(string str, string separator, int index)
        {
            var arr = str.Split(separator);
            return arr.Length - 1 >= index ? arr[index] : str;
        }


        public static string PrepareMessage(string str)
        {
            var i = str.IndexOf("--->");
            if (i > 0 && str.IndexOf("\n") > i)
            {
                return Split(Split(Split(str, "--->", 1), ":", 1), "\n", 0).Trim();
            }
            else
            {
                return str;
            }
        }


        public string type { get; set; }
        public string title { get; set; }
        public int status { get; set; }
        public string traceId { get; set; }
        public Dictionary<string, string[]> errors { get; set; }





        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }

    }
}

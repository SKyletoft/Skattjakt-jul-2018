using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Random_Reader {
	class Program {
		static void Main(string[] args) {
			Console.WriteLine("Enter seed:");
			String[] seeds = Console.ReadLine().Split(' ');
			try {
				for (int i = 0; i < seeds.Length; i++) {
					int seed = int.Parse(seeds[i]);
					Random rnd = new Random(seed);
					String myKey = "";
					int limit = (int) char.GetNumericValue(seed.ToString()[0]);
					for (int j = 0; j < limit; j++) {
						myKey += fromValidrange(rnd.Next());
					}
					Console.Write(myKey + " ");
				}
				Console.Write(DateTime.Now);
				Console.ReadKey();
			}
			catch (Exception e) {
				Console.WriteLine("Enter a number\nRelaunch the program and try again");
				Console.ReadKey(true);
			}
		}
		static char fromValidrange(int number) {
			number %= 37;
			if (number >= 0 && number <= 25) {
				return (char) (number + 65);
			}
			if (number >= 26 && number <= 35) {
				return (char) (number + 22);
			}
			return ' ';
		}
	}
}

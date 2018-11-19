

using System;
using System.Collections.Generic;
//using System.Linq;
using System.Text;
//using System.Threading.Tasks;

namespace Random_Writer {
	class Program {
		static int Main(string[] args) {
			Console.WriteLine("Generate seed for what password? Max 9 characters. The longer, the slower. Also less likely to find a solution");
			String inputString = Console.ReadLine().ToUpper();
			String[] inputStringArray = inputString.Split(' ');
			int[] outputArray = new int[inputStringArray.Length];
			DateTime startTime = DateTime.Now;
			for (int j = 0; j < inputStringArray.Length; j++) {
				String myLock = "";
				for (int i = 0; i < Math.Min(9, inputStringArray[j].Length); i++) {
					if ((inputStringArray[j][i] >= 'A' && inputStringArray[j][i] <= 'Z') ||
						(inputStringArray[j][i] >= '0' && inputStringArray[j][i] <= '9')) {
						myLock += inputStringArray[j][i];
					} else {
						myLock += ' ';
					}
				}
				Console.Title = "\"" + myLock + "\"";
				//Console.WriteLine("Password corrected to: \"" + myLock + "\"\nPress any key to start calculating...\n");
				//Console.ReadKey(true);
				Console.WriteLine("Running...");
				String myKey = "";
				int seed = 0;
				while (myLock != myKey) {
					Random rnd = new Random(seed);
					myKey = "";
					int limit = (int) char.GetNumericValue(seed.ToString()[0]);
					if (myLock.Length == limit) {
						for (int i = 0; i < limit; i++) {
							myKey += fromValidrange(rnd.Next());
							if (myKey[i] != myLock[i]) {
								break;
							}
						}
						//Console.WriteLine(seed + " " + myKey + " " + DateTime.Now);
						seed++;
					} else {
						seed = myLock.Length * (int) Math.Pow(10, seed.ToString().Length);
						//Console.WriteLine("Skipping to next valid range... " + seed + " " + DateTime.Now);
						if (seed < 0) {
							break;
						}
					}
				}
				Console.WriteLine(seed + " " + myKey + " " + DateTime.Now);
				outputArray[j] = seed - 1;
			}
			Console.Title = "DONE";
			Console.WriteLine("Success! " + (DateTime.Now - startTime));
			for (int i = 0; i < outputArray.Length; i++) {
				Console.WriteLine(outputArray[i]);
			}
			Console.ReadKey();
			return 0;
		}
		static char fromValidrange (int number) {
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
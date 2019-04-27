using System;
using System.Collections.Generic;

namespace EncoderWrite {
	class MainClass {
		public static bool minFilled (List<List<int>> array, int fillRateMinimum) {
			for (var i = 0; i < array.Count; i++) {
				if (array[i].Count < fillRateMinimum) {
					return false;
				}
			}
			return true;
		}
		public static int toNumber (string chars) {
			if (chars.Length == 3) {
				return (((int) chars[1]) << 8) + (int) chars[2];
			}
			return (int) chars[0];
		}
		public static string toString (int number) {
			if (number > 0xFFFF) {
				//Console.WriteLine("Long");
				//Console.WriteLine(((number >> 16) << 8));
				//Console.WriteLine((number & 0xFFFF));
				return "#" + ((char) ((number >> 16) << 8)).ToString() + ((char) (number & 0xFFFF)).ToString();
			}
			//Console.WriteLine("Short");
			return ((char) number).ToString();
		}
		public static void Main (string[] args) {
			var alphabet = "";
			var encoders = new List<List<int>> { };
			if (args.Length > 0) {
				if (args.Length == 2) {
					if (args[1] == "auto") {
						alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö.,-! 1234567890";
						//var encoders = new List<List<int>> { };
						for (var i = 0; i < alphabet.Length; i++) {
							encoders.Add(new List<int> { });
						}
						Console.WriteLine("Minimum amount of variants per character?\nThe program WILL crash if you don't enter a vaild number\n");
						var fillRate = int.Parse(Console.ReadLine());
						var seed = 0;
						while (!minFilled(encoders, fillRate)) {
							if (seed < 0) {
								Console.WriteLine("Overflow error");
								break;
							}
							var newChar = (char) new Random(seed).Next();
							var index = alphabet.IndexOf(newChar);
							if (index != -1) {
								encoders[index].Add(seed);
							}
							seed++;
						}
						for (var i = 0; i < encoders.Count; i++) {
							Console.Write(alphabet[i] + ": ");
							for (var j = 0; j < encoders[i].Count; j++) {
								Console.Write(encoders[i][j] + " ");
							}
							Console.WriteLine();
						}
						Console.WriteLine("Terminate");
					} else {
						Console.WriteLine("Enter key:");
						var index = 0;
						while (true) {
							var currentLine = Console.ReadLine();
							if (currentLine == "Terminate") {
								break;
							}
							alphabet += currentLine[0];
							currentLine = currentLine.Substring(2);
							encoders.Add(new List<int> { });
							var numbers = currentLine.Split(' ');
							for (var i = 0; i < numbers.Length; i++) {
								var tmpI = 0;
								if (int.TryParse(numbers[i], out tmpI)) {
									encoders[index].Add(tmpI);
								}
							}
						}
					}
				}
				if (args[0] == "w") {
					Console.WriteLine("Enter message:");
                    var input = Console.ReadLine();
					var rnd = new Random();
					for (var i = 0; i < input.Length; i++) {
						var index = alphabet.IndexOf(input[i]);
						Console.Write(toString(encoders[index][rnd.Next() % encoders[index].Count]));
					}
					Console.WriteLine();
				} else if (args[0] == "r") {
					Console.WriteLine("Enter message:");
					//var input = Console.ReadLine();
                    var input = new System.IO.StreamReader("input.txt").ReadLine();
					for (var i = 0; i < input.Length; i++) {
						var searchInt = (int) input[i];
						var searchString = input[i].ToString();
						var index = -1;
						if (input[i] == '#') {
							searchString = input.Substring(i, 3);
							searchInt = toNumber(input.Substring(i, 3));
							i += 2;
						}
						for (var j = 0; j < encoders.Count; j++) {
							if (encoders[j].Contains(searchInt)) {
								index = j;
								break;
							}
						}
						if (index == -1) {
							Console.WriteLine("Invalid character\nFatal error");
							return;
						}
						Console.Write(alphabet[index]);
					}
					Console.WriteLine();
				} else {
					Console.WriteLine("Invalid arguments\nFirst argument [r/w] read/write\nSecond argument [auto/*] generate key or enter manual key");
				}
			} else {
				Console.WriteLine("Missing arguments\nFirst argument [r/w] read/write\nSecond argument [auto/*] generate key or enter manual key");
			}
		}
	}
}

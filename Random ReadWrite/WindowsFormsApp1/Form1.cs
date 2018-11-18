using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApp1 {
    public partial class Form1:Form {
        public Form1() {
            InitializeComponent();
            pictureBox1.Image = Render(Int32.Parse(textBox1.Text));
        }
        
        public static Bitmap Render (int seed) {
            Bitmap bmp = new Bitmap(512, 512);
            int detailResolution = 64;
            Random rnd = new Random(seed);
            using (Graphics g = Graphics.FromImage(bmp)) {
                int[][] randoms = new int[detailResolution][];
                for (int i = 0; i < randoms.Length; i++) {
                    randoms[i] = new int[detailResolution];
                    for (int j = 0; j < randoms[i].Length; j++) {
                        randoms[i][j] = rnd.Next() % 255;
                    }
                }
                double xResolution = bmp.Width / (detailResolution);
                double yResolution = bmp.Height / (detailResolution);
                for (int x = 0; x < bmp.Width; x++) {
                    for (int y = 0; y < bmp.Height; y++) {
                        int brightness = 0;
                        int Y1 = (int) Math.Max(Math.Min((x / (xResolution)), detailResolution),1);
                        int Y2 = (int) Math.Max(Math.Min((y / (yResolution)), detailResolution),1);
                        int X1 = Y1 - 1;
                        int X2 = Y2 - 1;
                        double P1 = (((double) x % xResolution) / xResolution);
                        double P2 = (((double) y % yResolution) / yResolution);
                        brightness = (int) ((
                            WeightedAverage(randoms[X1][X1], randoms[Y1][Y2], P1) +
                            WeightedAverage(randoms[X2][X1], randoms[Y2][Y2], P2)) /
                            2
                        );
                        bmp.SetPixel(x, y, Color.FromArgb(255,brightness, brightness, brightness));
                    }
                }
            }
            return bmp;
        }
        public static double WeightedAverage(double x, double y, double percentage) {
            if (percentage > 1) {
                percentage /= 100;
            }
            return (x * (1 - percentage)) + (y * percentage);
        }
        public static double SoftWeight(double x, double y, double percentage) {
            percentage = Math.Max(Math.Min(percentage, 1), 0);
            //return 0.5 - (Math.Cos(Math.PI * WeightedAverage(x, y, percentage)) / 2);
            return WeightedAverage(x, y, 0.5 - (Math.Cos(Math.PI * percentage) / 2));
        }

        private void button1_Click(object sender, EventArgs e) {
            pictureBox1.Image = Render(Int32.Parse(textBox1.Text));
        }
    }
}

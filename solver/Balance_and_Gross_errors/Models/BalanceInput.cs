﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Balance_and_Gross_errors.Models;
using static Balance_and_Gross_errors.Models.BalanceSettings;

namespace Balance_and_Gross_errors.Models
{
    public class BalanceInput
    {
        private List<InputVariables> balanceInputVariables;
        public BalanceSettings balanceSettings { get; set; }
        
        public BalanceInput()
        {
            this.balanceInputVariables = new List<InputVariables>();
            this.balanceSettings = new BalanceSettings();
        }
        public List<InputVariables> BalanceInputVariables
        {
            get
            {
                return balanceInputVariables;
            }

            set 
            {
                try 
                {
                    foreach (InputVariables input in balanceInputVariables)
                    {
                        balanceInputVariables.Add(input);
                    }
                }
                catch (Exception)
                {
                    throw new ArgumentException();
                }

            }
        }
    }
}

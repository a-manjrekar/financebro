
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Info, AlertCircle, CreditCard, Landmark, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");
  const [withdrawMethod, setWithdrawMethod] = useState<string>("upi");
  const [upiId, setUpiId] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [ifscCode, setIfscCode] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  
  const availableBalance = 750;
  const minWithdrawal = 100;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input and up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    
    if (!amount || isNaN(amountNum)) {
      toast.error("Please enter a valid amount", {
        position: "top-center",
      });
      return;
    }
    
    if (amountNum < minWithdrawal) {
      toast.error(`Minimum withdrawal amount is ₹${minWithdrawal}`, {
        position: "top-center",
      });
      return;
    }
    
    if (amountNum > availableBalance) {
      toast.error("Insufficient balance", {
        position: "top-center",
      });
      return;
    }
    
    if (withdrawMethod === "upi" && !upiId) {
      toast.error("Please enter your UPI ID", {
        position: "top-center",
      });
      return;
    }
    
    if (withdrawMethod === "bank" && (!accountNumber || !ifscCode || !accountName)) {
      toast.error("Please fill all bank account details", {
        position: "top-center",
      });
      return;
    }
    
    // In a real app, this would make an API call to process the withdrawal
    toast.success(`Withdrawal of ₹${amountNum} initiated!`, {
      position: "top-center",
      description: "It will be processed within 1-2 business days.",
    });
    
    navigate("/wallet");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container max-w-5xl mx-auto p-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/wallet")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
          <p className="text-gray-600">Transfer your contest winnings to your bank account or UPI</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="Enter amount"
                      className="text-lg"
                    />
                    <div className="text-xs text-gray-500 flex items-center">
                      <Info className="w-3 h-3 mr-1" />
                      Minimum withdrawal amount: ₹{minWithdrawal}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Withdrawal Method</Label>
                    <RadioGroup
                      value={withdrawMethod}
                      onValueChange={setWithdrawMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2 text-electric-blue" />
                          UPI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center cursor-pointer">
                          <Landmark className="w-5 h-5 mr-2 text-electric-blue" />
                          Bank Transfer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {withdrawMethod === "upi" && (
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}
                  
                  {withdrawMethod === "bank" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Holder Name</Label>
                        <Input
                          id="accountName"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          placeholder="Enter account holder name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                          placeholder="Enter IFSC code"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Please Note:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Withdrawals are processed within 1-2 business days</li>
                        <li>A minimum withdrawal amount of ₹{minWithdrawal} is required</li>
                        <li>Please ensure your banking details are correct</li>
                        <li>No withdrawal fees are charged</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Withdraw Funds</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-pastel-blue p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Available Balance</div>
                  <div className="text-2xl font-bold">₹{availableBalance}</div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Withdrawal Amount</span>
                    <span className="font-medium">
                      {amount ? `₹${parseFloat(amount).toFixed(2)}` : '₹0.00'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax Deducted</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-bold text-green-600">
                        {amount ? `₹${parseFloat(amount).toFixed(2)}` : '₹0.00'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      Remaining balance after this withdrawal will be 
                      <span className="font-bold ml-1">
                        ₹{amount && !isNaN(parseFloat(amount)) 
                          ? Math.max(0, availableBalance - parseFloat(amount)).toFixed(2) 
                          : availableBalance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Withdraw;

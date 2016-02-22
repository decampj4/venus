//
//  SecondViewController.swift
//  Tenant
//
//  Created by Justin DeCamp on 2/21/16.
//  Copyright © 2016 Tenant. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController, UITextViewDelegate {
    @IBOutlet weak var reviewTextBox: UITextView!
    var reviewTextBoxPlaceholderText = "Please enter a review..."
    var rating:Int = 3
    @IBOutlet weak var ratingImage: UIImageView!
    let ratingImages = ["1 Star Rating.png", "2 Star Rating.png", "3 Star Rating.png", "4 Star Rating.png", "5 Star Rating.png"]
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        ratingImage.userInteractionEnabled = true
        let imageTapGesture = UITapGestureRecognizer(target: self, action: "imageTap:")
        ratingImage.addGestureRecognizer(imageTapGesture)
        reviewTextBox.delegate = self
        let tap = UITapGestureRecognizer(target: self, action: "dismissKeyboard:")
        self.view.addGestureRecognizer(tap)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func sendReview(sender: AnyObject) {
        let url = "http://tenant.place/api/v1/review?token=8y93z2TiXJEgTt7vQRouGM9IcymNVwZs"
        let session = NSURLSession.sharedSession()
        let request:NSMutableURLRequest = NSMutableURLRequest(URL: NSURL(string: url)!)
        request.HTTPMethod = "POST"
        let postString = "rating=\(rating)&content=\(reviewTextBox.text)"
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        let task = session.dataTaskWithRequest(request) { (data, response, error) -> Void in
            if (error != nil) {
                print(error)
            } else {
                print(response)
            }
        }
        task.resume()
    }
    
    func imageTap(gestureRecognizer: UIGestureRecognizer) {
        if gestureRecognizer.state == UIGestureRecognizerState.Ended {
            let tapPoint = gestureRecognizer.locationInView(self.ratingImage)
            rating = Int(tapPoint.x/ratingImage.frame.width * 5)
            ratingImage.image = UIImage(named: ratingImages[rating])
        }
    }
    
    func textViewDidBeginEditing(textView: UITextView) {
        if(reviewTextBox.text == reviewTextBoxPlaceholderText) {
            reviewTextBox.text = ""
            reviewTextBox.textColor = UIColor.blackColor()
        }
    }
    
    func textViewDidEndEditing(textView: UITextView) {
        if(reviewTextBox.text == "") {
            reviewTextBox.text = reviewTextBoxPlaceholderText
            reviewTextBox.textColor = UIColor.lightGrayColor()
        }
    }
    
    func dismissKeyboard(gestureRecognizer: UIGestureRecognizer) {
        reviewTextBox.resignFirstResponder()
    }
    

}


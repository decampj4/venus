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
    
    var activityIndicator: UIActivityIndicatorView = UIActivityIndicatorView()
    
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
        // Start spinner
        let height = self.view.frame.height
        let width = self.view.frame.width
        activityIndicator = UIActivityIndicatorView(frame: CGRectMake(self.view.center.x, self.view.center.y, width, height))
        activityIndicator.center = self.view.center
        activityIndicator.hidesWhenStopped = true
        activityIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.Gray
        activityIndicator.backgroundColor = UIColor.lightGrayColor()
        activityIndicator.alpha = 0.5
        view.addSubview(activityIndicator)
        activityIndicator.startAnimating()
        UIApplication.sharedApplication().beginIgnoringInteractionEvents()
        
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
            dispatch_async(dispatch_get_main_queue(), { () -> Void in
                self.activityIndicator.stopAnimating()
                self.activityIndicator.hidden = true
                UIApplication.sharedApplication().endIgnoringInteractionEvents()
            })
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


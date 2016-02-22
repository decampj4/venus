//
//  FirstViewController.swift
//  Tenant
//
//  Created by Justin DeCamp on 2/21/16.
//  Copyright © 2016 Tenant. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController, UITableViewDelegate {
    @IBOutlet weak var reviewsTable: UITableView!
    
    var reviews: NSArray = NSArray()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Get the reviews
        let url = NSURL(string: "http://tenant.place/api/v1/reviews?token=8y93z2TiXJEgTt7vQRouGM9IcymNVwZs")!
        let session = NSURLSession.sharedSession()
        let task = session.dataTaskWithURL(url) { (data, response, error) -> Void in
            if error != nil {
                print(error)
            } else {
                    dispatch_async(dispatch_get_main_queue(), { () -> Void in
                        do {
                            self.reviews = try NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! NSArray
                        } catch {
                            print("Error reading response data")
                        }
                        self.reviewsTable.reloadData()
                    })
            }
        }
        
        task.resume()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return reviews.count
    }

    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell{
        let cell = UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "reviewCell")
        cell.textLabel?.text = reviews[indexPath.row]["content"] as? String
        return cell
    }


}

